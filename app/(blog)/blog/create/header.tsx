import LogoutButton from "@/components/LogoutButton";

const Header = () => {
  return (
    <header className="bg-background">
      <div className="bg-card shadow-sm mb-1">
        <div className="max-w-4xl mx-20 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Create New Blog Post
              </h1>
              <p className="text-muted-foreground">
                Share your thoughts and ideas with the world
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin Panel</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
