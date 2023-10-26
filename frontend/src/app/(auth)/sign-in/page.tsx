import ButtonPlay from "@components/atoms/ButtonPlay";
import Bar from "@components/atoms/decoration/Bar";
import ButtonBA from "@components/atoms/decoration/ButtonsBA";
import ButtonStartSelect from "@components/atoms/decoration/ButtonsStartSelect";
import SignIn from "@components/molecules/authentication/SignIn";
import Layout from "@components/templates/Layout";

function SignInPage() {
  return (
    <Layout>
      <div className="flex flex-col justify-center py-16 px-8">
        <SignIn></SignIn>
        <Bar width="w-5/6" margin="mt-24"></Bar>
        <section className="flex justify-between items-center pt-12">
          <ButtonPlay backgroundColor="bg-light-bg-secondary"></ButtonPlay>
          <ButtonBA></ButtonBA>
        </section>
        <div className="flex justify-center">
          <ButtonStartSelect></ButtonStartSelect>
        </div>
      </div>
    </Layout>
  );
}

export default SignInPage;
