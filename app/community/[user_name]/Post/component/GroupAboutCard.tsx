import { FaCalendarAlt, FaHeart, FaGlobe } from 'react-icons/fa';

export default function GroupAboutCard() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">About</h3>
      <p className="text-sm text-gray-600 mb-4">
        He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
      </p>

      <div className="flex items-start text-sm text-gray-700 mb-2">
        <FaCalendarAlt className="mt-1 mr-2 text-gray-500" />
        <p>
          People: <span className="font-semibold">20 Members</span>
        </p>
      </div>

      <div className="flex items-start text-sm text-gray-700 mb-2">
        <FaHeart className="mt-1 mr-2 text-gray-500" />
        <p>
          Status: <span className="font-semibold">Public</span>
        </p>
      </div>

      <div className="flex items-start text-sm text-gray-700">
        <FaGlobe className="mt-1 mr-2 text-gray-500" />
        <a
          href="https://www.stackbros.com"
          className="text-blue-600 hover:underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.stackbros.com
        </a>
      </div>
    </div>
  );
}
