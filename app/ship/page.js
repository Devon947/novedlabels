'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShipPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to main page with shipping tab active
    router.push('/?tab=shipping');
  }, [router]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-200">Redirecting to shipping form...</h2>
      </div>
    </div>
  );
} 