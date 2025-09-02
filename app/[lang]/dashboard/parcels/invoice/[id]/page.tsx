import PdfViewerWrapper from '@/components/common/PdfViewerWrapper'

type Invoice = {
    params: Promise<{ id: string }>
}
const Invoice = async ({ params }: Invoice) => {
    const { id } = await params;
    return (
            
        <PdfViewerWrapper fileUrl={`https://middleware-dev-legacy.spacecargo.ge/invoice/get_pdf?parcelId=242722`} />
    )
}

export default Invoice
