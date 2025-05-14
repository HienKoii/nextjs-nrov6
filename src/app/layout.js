import "@/styles/globals.css";
import { Providers } from "./providers";
import Header from "@/layouts/Header";
import MainLayout from "./main";
import Footer from "@/layouts/Footer";
import WelcomeModal from "@/components/modals/WelcomeModal";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Chào mừng bạn đến với ngọc rồng Ponny",
  description: "Ngọc rồng Ponny free all không nạp 100%",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <Header />
            <MainLayout>{children}</MainLayout>
            <Footer />
            <WelcomeModal />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
