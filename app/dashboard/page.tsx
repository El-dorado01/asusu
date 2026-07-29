// app/dashboard/page.tsx
import { RecommendedSocietiesClient } from '@/components/recommended-societies-client';
import { PublicSocietiesClient } from '@/components/public-societies-client';
import { getFinancialPassport } from '@/app/actions/passport';
import { PassportWidget } from '@/components/passport-widget';

export default async function Dashboard() {
  const passport = await getFinancialPassport();

  return (
    <div className='flex flex-1 flex-col px-6'>
      <div className='@container/main grid flex-1 grid-cols-1 gap-6 py-6 md:gap-8 md:py-8 lg:grid-cols-5'>
        {/* Main Content - Left (3/5) */}
        <main className='lg:col-span-3 space-y-10'>
          <section>
            <h2 className='mb-5 text-2xl font-bold'>Recommended for You</h2>
            <RecommendedSocietiesClient />
          </section>

          <section>
            <h2 className='mb-5 text-2xl font-bold'>
              Explore Public Societies
            </h2>
            <PublicSocietiesClient />
          </section>
        </main>

        {/* Sidebar - Right (2/5) */}
        <aside className='lg:col-span-2'>
          <div className='sticky top-6 space-y-6'>
            {/* Signature Financial Passport Widget */}
            <PassportWidget passport={passport} />

            {/* Quick Stats */}
            <div className='rounded-xl border bg-card p-6 shadow-sm'>
              <h3 className='text-lg font-semibold mb-4'>Your Activity</h3>
              <div className='space-y-4 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>
                    Active Societies
                  </span>
                  <span className='font-medium'>{passport.verified_cooperatives_count}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Total Savings</span>
                  <span className='font-medium text-emerald-600 dark:text-emerald-400'>
                    ₦{passport.total_savings.toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Reputation Rank</span>
                  <span className='font-medium text-primary'>{passport.trust_level.split('—')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
