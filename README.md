# ItemHub - Manage Your Inventory

ItemHub is a React-based inventory management application that allows users to add, view, and manage items in their collection. The application is built using modern web technologies and provides a seamless user experience with features like image uploads, notifications, and modals.

## Features

### 1. Add Items
- Add new items to your inventory with details like name, type, description, cover image, and additional images.
- Supports image uploads for both cover and additional images.
- Displays a success notification upon successful addition of an item.

### 2. View Items
- Browse and explore your inventory in a responsive grid layout.
- Click on an item to view its details in a modal.
- Includes an image carousel for viewing multiple images of an item.

### 3. Item Details Modal
- View detailed information about an item, including its type, description, and creation date.
- Enquire about an item with a single click.

### 4. Navigation
- Navigate between "View Items" and "Add Items" pages using a responsive navigation bar.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **React Router**: For managing routes and navigation.
- **Tailwind CSS**: For styling the application.
- **Lucide React**: For icons used throughout the application.

### Build Tools
- **Vite**: For fast development and build processes.

### TypeScript
- Used for type safety and better developer experience.

### State Management
- **React Context**: For managing the inventory state globally.

### Notifications
- Custom success notification component for user feedback.

### Image Handling
- **FileReader API**: For handling image uploads and previews.

## Project Structure

```
├── src/
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Entry point for React
│   ├── index.css              # Tailwind CSS imports
│   ├── components/            # Reusable components
│   │   ├── ImageCarousel.tsx  # Image carousel component
│   │   ├── ItemModal.tsx      # Modal for item details
│   │   ├── Navigation.tsx     # Navigation bar
│   │   ├── SuccessNotification.tsx # Success notification
│   ├── context/
│   │   ├── ItemContext.tsx    # Context for managing items
│   ├── pages/
│   │   ├── AddItems.tsx       # Page for adding items
│   │   ├── ViewItems.tsx      # Page for viewing items
│   ├── types/
│   │   ├── index.ts           # Type definitions
├── index.html                 # HTML entry point
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json          # TypeScript app-specific config
├── tsconfig.node.json         # TypeScript node-specific config
├── package.json               # Project dependencies and scripts
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint configuration
└── .gitignore                 # Git ignore file
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## Screenshots


### View Live Page
![Click to View](https://via.placeholder.com/800x400)
