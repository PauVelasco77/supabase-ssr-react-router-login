import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type ActionFunctionArgs, redirect, useFetcher } from 'react-router';

export const clientAction = async ({ request }: ActionFunctionArgs) => {
  const supabase = createClient();
  const origin = new URL(request.url).origin;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/oauth?next=/protected`,
    },
  });

  if (data.url) {
    return redirect(data.url);
  }

  if (error) {
    return {
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};

export default function Login() {
  const fetcher = useFetcher<typeof clientAction>();

  const error = fetcher.data?.error;
  const loading = fetcher.state === 'submitting';

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome!</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <fetcher.Form method="post">
                <div className="flex flex-col gap-6">
                  {error && (
                    <p className="text-destructive-500 text-sm">{error}</p>
                  )}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Continue with Google'}
                  </Button>
                </div>
              </fetcher.Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
