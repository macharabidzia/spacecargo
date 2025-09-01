'use client';

import { Button } from '@/components/ui/button';
import { useServerAction } from '@/hooks/useServerAction';
import { buyPrize } from '@/actions/bonus.actions';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BuyVoucherButton({ voucherId }: { voucherId: number }) {
    const { execute, isPending } = useServerAction(buyPrize)
    const router = useRouter()
    const handleClick = async () => {
        await execute(voucherId.toString())
        router.refresh()
    };
    return (
        <Button onClick={handleClick} disabled={isPending} className="bg-space-blue-muted dark:text-white h-12 min-w-[120px] dark:hover:bg-space-blue-muted/80 ">
            <ShoppingCart size={18} />
            ყიდვა
        </Button>
    );
}
