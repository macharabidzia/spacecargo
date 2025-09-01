import { getAuthorizedPersons } from '@/actions/user.actions';
import SettingsTableClient from '@/components/features/settings/SettingsTableClient';

export const dynamic = 'force-dynamic'
const AuthorizedPersonsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
    const perPage = typeof params?.perPage === 'string' ? parseInt(params.perPage) : 10;
    const result = await getAuthorizedPersons();
    const TABLE_UNIQUE_ID = "AuthorizedPersonsTable"
    return (
        <SettingsTableClient tableId={TABLE_UNIQUE_ID}
            data={result}
            pageSize={perPage}
            currentPage={page}
            recordsNumber={5} />
    )
}

export default AuthorizedPersonsPage
