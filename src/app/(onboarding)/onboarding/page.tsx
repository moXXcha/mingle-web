import { createProfileFormAction } from '@/actions/createProfileFormAction';
import { ProfileForm } from '@/components/ProfileForm';
import UserNameForm from '@/components/UserNameForm';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.user_metadata.hasUserName) {
    return <UserNameForm />;
  }

  if (user?.user_metadata.hasUserName && !user?.user_metadata.hasProfile) {
    const createProfileFormActionByUserId = createProfileFormAction.bind(
      null,
      user.id,
    );
    return (
      <ProfileForm
        formAction={createProfileFormActionByUserId}
        actionType="create"
      />
    );
  }

  // オンボーディングが完了したら、ホーム画面にリダイレクトする
  if (user.user_metadata.hasProfile) {
    console.log(
      'オンボーディングが完了したので、ホーム画面にリダイレクトします。',
    );
    // modalかbuttonを押したら、ホーム画面にリダイレクトする
    return (
      <div>
        <p>プロフィールが作成できました</p>
        <Link className="border" href="/">
          ホーム画面に戻る
        </Link>
      </div>
    );
  }
}
