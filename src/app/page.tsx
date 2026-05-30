import MainContent from "../../components/MainContent";
import Posts from "../../components/Posts";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MainContent />
      <Posts />
    </div>
  );
}
