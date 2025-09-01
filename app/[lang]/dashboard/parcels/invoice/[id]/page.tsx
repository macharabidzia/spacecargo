import PdfViewerWrapper from '@/components/common/PdfViewerWrapper'

type Invoice = {
    params: Promise<{ id: string }>
}
const Invoice = async ({ params }: Invoice) => {
    const { id } = await params;
    return (
        <PdfViewerWrapper fileUrl={`https://middleware.spacecargo.ge/invoice/get_pdf?parcelId=${id}`} />
    )
}

export default Invoice
