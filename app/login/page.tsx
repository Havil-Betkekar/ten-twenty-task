import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main className="h-screen w-screen flex items-center justify-center">
        <div className="w-full h-screen flex overflow-hidden shadow-2xl">
          {/* login form */}
          <div className="w-1/2 bg-white flex items-center justify-center p-12">
            <LoginForm />
          </div>
          {/* product description */}
          <div className="w-1/2 bg-blue-600 flex flex-col items-start justify-center p-12 text-white">
            <h1 className="text-4xl font-bold mb-6">ticktock</h1>
            <p className="text-left text-blue-100 text-sm leading-relaxed">
              {" "}
              Introducing ticktock, our cutting-edge timesheet web application
              designed to revolutionize how you manage employee work hours. With
              ticktock, you can effortlessly track and monitor employee
              attendance and productivity from anywhere, anytime, using any
              internet-connected device.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
