import ButtonPlay from "@components/atoms/ButtonPlay";
import Bar from "@components/atoms/decoration/Bar";
import ButtonBA from "@components/atoms/decoration/ButtonsBA";
import ButtonStartSelect from "@components/atoms/decoration/ButtonsStartSelect";
import SignIn from "@components/molecules/authentication/SignIn";
import LayoutAuth from "@components/templates/LayoutAuth";

function SignInPage() {
  return (
    <LayoutAuth>
      <div className="flex flex-col justify-center py-16 sm:py-0 px-8">
        <SignIn />
        <Bar width="w-5/6" margin="mt-24 sm:mt-10" />
        <section className="flex justify-between items-center pt-12">
          <ButtonPlay backgroundColor="bg-light-bg-secondary" />
          <ButtonBA />
        </section>
        <div className="flex justify-center">
          <ButtonStartSelect />
        </div>
      </div>
    </LayoutAuth>
  );
}

export default SignInPage;
