import AddressForm from "@/components/features/settings/AddressForm";
export const dynamic = 'force-dynamic'

const Addresspage = async() => {
  return (
    <div className="px-0">
        <AddressForm />
    </div>
  );
};

export default Addresspage;
