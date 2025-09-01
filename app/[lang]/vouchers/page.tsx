import { getBonusPrizes } from '@/actions/bonus.actions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VoucherCard } from '@/components/features/vouchers/VoucherCard';
import Link from 'next/link';
import { fetchUserDashboard, getUserInfo } from '@/actions/user.actions';
import { getDictionary } from '@/i18n/dictionaries';

type Voucher = {
    ID: number;
    Name: string;
    Description: string;
    Main_iamge_url: string;
    Point: string;
};

const voucherColors = ['#3b82f6', '#22c55e', '#ef4444', '#a855f7'];
export const dynamic = 'force-dynamic'
type IVocuhersProps = {
    params: Promise<{ lang: Lang }>
}
const VouchersPage = async ({ params }: IVocuhersProps) => {
    const { lang } = await params;
    const bonuses: Voucher[] = await getBonusPrizes();
    const user = await fetchUserDashboard()
    const { userInfo } = await getUserInfo()
    const dictionary = (await getDictionary(lang)).common
    return (
        <div className='container my-10'>
            <Card className='m-0 border-0'>
                <CardHeader>
                    <div className='flex flex-row justify-between items-center'>
                        <div>
                            <p className="text-gray-500 dark:text-white  mb-3">{userInfo.firstNameGe}<br /> <span className='text-gray-500'>{dictionary['you.have']}</span></p>
                            <div className='flex flex-row gap-2 items-center'>
                                <span className="font-bold text-3xl text-space-blue-light">{user.bonusPoint.toFixed(2)}</span>
                                <h1 className="text-xl font-bold">{dictionary['dashboardStats.spaceCoins']}</h1>
                            </div>

                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    {bonuses && bonuses.length > 0 ? (
                        <div className='flex flex-wrap gap-4 pb-4 lg:justify-start justify-center'>
                            {bonuses.map((bonus: Voucher, index) => (
                                <Link key={bonus.ID} href={`vouchers/${bonus.ID}`}>
                                    <VoucherCard
                                        lang={lang}
                                        voucher={bonus}
                                        color={voucherColors[index % voucherColors.length]}
                                    />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No bonus prizes found.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default VouchersPage;