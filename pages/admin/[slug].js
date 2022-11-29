import SignedInCheck from "../../components/admincomponents/SignedInCheck";
import PostManager from "../../components/admincomponents/PostManager";

const AdminPostEdit = () => {
  return (
    <main className="bg-[#CAD2c5] h-full pt-[15rem]">
      <SignedInCheck>
        <PostManager />
      </SignedInCheck>
    </main>
  );
};

export default AdminPostEdit;
