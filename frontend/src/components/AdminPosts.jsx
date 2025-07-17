import AdminPostsClinic from "./AdminPostsClinic";
import AdminPostsProfessional from "./AdminPostsProfessional";

const AdminPosts = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-around gap-10 pt-32 pb-10 text-gray-200 lg:flex-row lg:pt-0 lg:pb-0">
      <AdminPostsClinic />
      <AdminPostsProfessional />
    </div>
  );
};

export default AdminPosts;
