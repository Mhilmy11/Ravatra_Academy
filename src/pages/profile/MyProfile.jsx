export default function MyProfile({ user }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Profile Header */}
      <div className="border-b border-slate-200 px-5 py-6 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
            {user.firstname?.charAt(0)}
            {user.lastname?.charAt(0)}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-slate-800">
              {user.firstname} {user.lastname}
            </h2>

            <p className="mt-1 truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="px-5 py-6 sm:px-6">
        <h3 className="text-lg font-semibold text-slate-800">
          Account Information
        </h3>

        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              First Name
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-700">
              {user.firstname || "-"}
            </p>
          </div>

          {/* Last Name */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Last Name
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-700">
              {user.lastname || "-"}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Email Address
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-700">
              {user.email || "-"}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Phone Number
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-700">
              {user.phone || "-"}
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Company
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-700">
              {user.company || "-"}
            </p>
          </div>

          {/* User Code */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              User Code
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-700">
              {user.user_code || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Account Status */}
      <div className="border-t border-slate-200 px-5 py-6 sm:px-6">
        <h3 className="text-lg font-semibold text-slate-800">Account Status</h3>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {user.status}
          </span>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}
