import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>SocialGuardian</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Welcome to SocialGuardian
        </h1>

        <p className="mt-3 text-2xl">
          Social Media Management, Protection, and Growth Platform
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="#"
            className="mt-6 w-96 rounded-xl border border-blue-200 p-6 text-left hover:border-blue-600"
          >
            <h3 className="text-2xl font-bold text-blue-600">AI Strategy Coach &rarr;</h3>
            <p className="mt-4 text-xl">
              Get personalized recommendations to improve your social media strategy.
            </p>
          </a>

          <a
            href="#"
            className="mt-6 w-96 rounded-xl border border-blue-200 p-6 text-left hover:border-blue-600"
          >
            <h3 className="text-2xl font-bold text-blue-600">Account Guardian &rarr;</h3>
            <p className="mt-4 text-xl">
              Secure your social media following with automated backups.
            </p>
          </a>

          <a
            href="#"
            className="mt-6 w-96 rounded-xl border border-blue-200 p-6 text-left hover:border-blue-600"
          >
            <h3 className="text-2xl font-bold text-blue-600">Content Studio &rarr;</h3>
            <p className="mt-4 text-xl">
              Create and schedule content with AI-powered optimization.
            </p>
          </a>

          <a
            href="#"
            className="mt-6 w-96 rounded-xl border border-blue-200 p-6 text-left hover:border-blue-600"
          >
            <h3 className="text-2xl font-bold text-blue-600">Influencer Marketplace &rarr;</h3>
            <p className="mt-4 text-xl">
              Find and collaborate with the perfect creators for your brand.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <p>© 2025 SocialGuardian. All rights reserved.</p>
      </footer>
    </div>
  );
}
