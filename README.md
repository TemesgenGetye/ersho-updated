# Ersho Events - Event Organizer Website

A modern event organizer website built with Next.js, Tailwind CSS, and Supabase. Features include event management, user image submissions with admin approval, and a clean, responsive design using white, black, and brown color scheme.

## Features

- **Event Management**: Organizers can create and manage events
- **Image Gallery**: Users can submit photos from events for admin approval
- **Admin Dashboard**: Simple admin panel for managing events and approving images
- **User Authentication**: Secure sign-up and sign-in system
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean design with white, black, and brown color scheme

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Storage)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ersho-events
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up Supabase:
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

4. Set up the database:

   - Go to your Supabase dashboard
   - Navigate to the SQL Editor
   - Run the SQL commands from `supabase-schema.sql`

5. Run the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following main tables:

- **events**: Stores event information
- **event_images**: Stores user-submitted images with approval status
- **profiles**: Stores user profile information and roles

## User Roles

- **User**: Can view events, submit images, and manage their profile
- **Admin**: Can manage events, approve/reject images, and access admin dashboard

## Key Features

### Event Management

- View upcoming events on the homepage
- Admin can create, edit, and delete events
- Event details include title, description, date, location, and images

### Image Gallery

- Users can upload photos from events
- Images require admin approval before going live
- Approved images are displayed in the public gallery
- Admin can approve or reject submitted images

### Admin Dashboard

- Overview of events and image statistics
- Manage events (create, edit, delete)
- Review and approve/reject user-submitted images
- Simple and intuitive interface

## File Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── signin/
│   │   └── signup/
│   ├── admin/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── EventsSection.tsx
│   ├── GallerySection.tsx
│   ├── AboutSection.tsx
│   ├── TestimonialsSection.tsx
│   └── NewsletterSection.tsx
├── contexts/
│   └── AuthContext.tsx
└── lib/
    ├── supabase.ts
    └── supabase-server.ts
```

## Deployment

1. Build the application:

```bash
pnpm build
```

2. Deploy to your preferred platform (Vercel, Netlify, etc.)

3. Make sure to set the environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
