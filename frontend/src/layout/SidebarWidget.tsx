export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        #1 Blood Donation App
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Join us in our mission to save lives through blood donation. Your
        contribution can make a difference!
      </p>
      <a
        href="/"
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-red-500 text-theme-sm hover:bg-red-600"
      >
        <svg
          className="mr-2 -ml-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5v-6l-10 5L2 11v6z" />
        </svg>
        Visit Us
      </a>
    </div>
  );
}
