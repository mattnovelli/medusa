# Build Notes

## Google Fonts

This project uses Google Fonts (DM Sans, Lexend, VT323) which are loaded via Next.js's `next/font/google` feature.

### Build Requirements

During the build process, Next.js attempts to download and optimize these fonts from Google's CDN. This requires:
- Internet access to `fonts.googleapis.com`
- Network connectivity during the build step

### If Build Fails Due to Font Loading

If you encounter font loading errors during build (e.g., `ENOTFOUND fonts.googleapis.com`), you have a few options:

1. **Ensure Internet Access** (Recommended)
   - Make sure your build environment has access to Google Fonts
   - This is the default configuration and works in most deployment platforms

2. **Use Local Fonts** (Alternative)
   - Download the fonts and place them in `/public/fonts`
   - Update the font imports to use `next/font/local` instead
   - Example:
     ```typescript
     import localFont from 'next/font/local'
     
     const dmSans = localFont({
       src: '../../../public/fonts/DMSans-Regular.woff2',
       weight: '400',
     })
     ```

3. **Remove Custom Fonts** (Quick Fix)
   - Comment out the font imports
   - Use system fonts instead
   - The site will still function, just with different typography

## PostgreSQL Database

The repair form requires a PostgreSQL database connection. Configure via environment variables:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

Or use individual connection parameters:
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=your_database
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
```

The database table will be created automatically on first use.

## Discord Notifications (Optional)

To receive Discord notifications for repair requests:

```bash
DISCORD_WEBHOOK_URL=your_webhook_url
```
