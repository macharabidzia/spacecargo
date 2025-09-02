"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PdfViewerWrapper from "@/components/common/PdfViewerWrapper";

interface InvoiceModalProps {
  id: string | null;
  setOpenInvoiceId: (id: string | null) => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ id, setOpenInvoiceId }) => {
  const open = !!id;
    
  if (!id) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && setOpenInvoiceId(null)}>
      <DialogContent className="sm:max-w-xl w-full">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>
            View and download the invoice PDF.
          </DialogDescription>
        </DialogHeader>

        <PdfViewerWrapper
          fileUrl={`https://middleware-dev-legacy.spacecargo.ge/invoice/get_pdf?parcelId=${242722}`}
        />

        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={() => setOpenInvoiceId(null)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
