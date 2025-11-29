import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useCurrentUrl } from "./hooks/useCurrentUrl";
import "./amplify-config"; // Change this line

function AppContent() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const currentUrl = useCurrentUrl();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              URL Chat Extension
            </h1>
            <p className="text-sm text-gray-600">
              Logged in as <span className="font-medium">{user.username}</span>
            </p>
          </div>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        </div>

        {/* Chat Interface */}
        {currentUrl ? (
          <Chat currentUrl={currentUrl} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Loading current URL...</p>
          </div>
        )}
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
