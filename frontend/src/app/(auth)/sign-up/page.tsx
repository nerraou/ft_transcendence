import ButtonPlay from "@atoms/ButtonPlay";
import Bar from "@atoms/decoration/Bar";
import ButtonBA from "@atoms/decoration/ButtonsBA";
import ButtonStartSelect from "@atoms/decoration/ButtonsStartSelect";
import SignUp from "@molecules/authentication/SignUp";
import LayoutAuth from "@templates/LayoutAuth";

function SignUpPage() {
  return (
    <LayoutAuth>
      <div className="flex flex-col justify-center py-16 sm:py-0 px-8">
        <SignUp />
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

export default SignUpPage;
