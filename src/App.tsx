import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useCurrentUrl } from "./hooks/useCurrentUrl";
import "./amplify-config";

function AppContent() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { currentUrl, loading: urlLoading } = useCurrentUrl();

  return (
    <div className="min-h-[600px] w-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-3 mb-3 flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-800 truncate">
              URL Chat
            </h1>
            <p className="text-xs text-gray-600 truncate">{user.username}</p>
          </div>
          <button
            onClick={signOut}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-medium ml-2 flex-shrink-0"
          >
            Sign Out
          </button>
        </div>

        {/* Chat Interface */}
        <Chat currentUrl={currentUrl} urlLoading={urlLoading} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Auth>
      <AppContent />
    </Auth>
  );
}

export default App;
