// app/api/GetSteamIcons/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {

    const url = new URL(request.url);
    const appid = url.searchParams.get('appid');
    const iconhash = url.searchParams.get('iconhash');

    if (!appid || !iconhash) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        console.log(`Fetching image from URL: http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${iconhash}.jpg`);

        const response = await fetch(`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${iconhash}.jpg`);
        
        if (!response.ok) {
            console.error(`Image for appid ${appid} and iconhash ${iconhash} not found.`);
            return new NextResponse(new ArrayBuffer(0), {
                status: 404,
                headers: { 'Content-Type': 'image/jpeg' }
            });
        }

        const imageBuffer = await response.arrayBuffer();
        
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        });
    } catch (error) {
        console.error('Image fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
