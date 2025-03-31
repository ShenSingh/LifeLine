import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="LifeLine | Sign In"
        description="Sign in to your LifeLine account"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
