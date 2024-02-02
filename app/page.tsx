import URLInputField from "@/app/ui/urlInputFiled";

export default function Home() {
  return (
    <main>
      <h1>Welcome to What People Say!</h1>
      {/* create an input filed  */}
      <URLInputField placeholder="Enter URL" />
      {/* create a button to send the input to server -> server actions */}

      {/* text filed to display the output */}
      <div>
        <p>sample text out</p>
      </div>
    </main>
  );
}
