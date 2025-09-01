import VoucherBackground from '@/public/icons/voucher-pattern.svg';
import LogoIcon from '@/public/icons/logo-white.svg';
import { Card } from '@/components/ui/card';
import { getDictionary } from '@/i18n/dictionaries';

type Voucher = {
    ID: number;
    Name: string;
    Description: string;
    Main_iamge_url: string;
    Point: string;
};

type VoucherCardProps = {
    voucher: Voucher;
    color: string;
    lang: Lang;
};

export const VoucherCard = async ({ voucher, color, lang }: VoucherCardProps) => {
    const voucherValue = voucher.Name.match(/\d+/);
    const dictionary = (await getDictionary(lang)).common
    return (
        <Card
            className="relative min-w-[368px] h-[210px] rounded-xl overflow-hidden shadow-lg border-0"
            style={{ backgroundColor: color }}
        >
            <VoucherBackground className="w-full h-full absolute" />
            <div className="absolute top-4 left-4 text-white">
                <p className="text-sm uppercase font-bold">{dictionary['brand']}</p>
                <p className="text-xl font-bold">{dictionary['voucherLabel']}</p>
            </div>
            <div className="absolute right-4 top-4">
                <LogoIcon className="w-24 h-14" />
            </div>
            <div className="absolute bottom-4 right-4 text-white text-3xl font-bold">
                {voucherValue ? `${voucherValue[0]}€` : 'N/A'}
            </div>
        </Card>
    );
};