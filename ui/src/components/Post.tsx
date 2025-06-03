const ForumPost = ({ title, author, content, timestamp }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {timestamp}
        </span>
      </div>
      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
        by {author}
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {content}
      </p>
      <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Reply
        </button>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
          Like
        </button>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          Report
        </button>
      </div>
    </div>
  );
};
export default ForumPost;
