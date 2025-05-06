import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common database operations

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserStats(userId) {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getReferralStats(userId) {
  const { data, error } = await supabase
    .from('referral_stats')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getRecentOrders(userId, limit = 5) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
}

export async function getRecentReferrals(userId, limit = 5) {
  const { data, error } = await supabase
    .from('referrals')
    .select(`
      *,
      referred_user:referred_user_id (
        email,
        full_name
      )
    `)
    .eq('referrer_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
}

export async function getPartnerStatus(userId) {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function createOrder(userId, orderData) {
  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id: userId, ...orderData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function createPartnerApplication(userId, applicationData) {
  const { data, error } = await supabase
    .from('partners')
    .insert([{ user_id: userId, ...applicationData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function createReferral(referrerId, referredUserId) {
  const { data, error } = await supabase
    .from('referrals')
    .insert([{
      referrer_id: referrerId,
      referred_user_id: referredUserId,
      status: 'pending'
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateReferralStatus(referralId, status) {
  const { data, error } = await supabase
    .from('referrals')
    .update({ status })
    .eq('id', referralId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}