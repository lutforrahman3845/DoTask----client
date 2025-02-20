const WorkingProcess = () => {
    return (
      <div className="p-6   max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">How It Works</h2>
        <div className="relative border-l-4 border-blue-500 pl-6 space-y-6">
          
          {/* Step 1 */}
          <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-600">📝 Add a Task</h3>
            <p className="text-gray-600 dark:text-white">Click the &quot;Add Task&quot; button and enter details like title and description.</p>
          </div>
  
          {/* Step 2 */}
          <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-600">📂 Drag & Drop</h3>
            <p className="text-gray-600 dark:text-white">Move tasks between &quot;To-Do&quot;, &quot;In Progress&quot;, and &quot;Done&quot; to track progress.</p>
          </div>
  
          {/* Step 3 */}
          <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-600">✅ Stay Organized</h3>
            <p className="text-gray-600 dark:text-white">Your tasks are saved instantly, so you never lose progress.</p>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default WorkingProcess;
  