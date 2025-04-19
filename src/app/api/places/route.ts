import { supabase } from '@/lib/supabase';

export async function POST( 
    request: Request,
    { params }: { params: Promise<{slug: string}> } // does this comin from '?slug=stuff' in the request?
) {
    const formData = await request.formData();
    const idea = formData.get('idea') as string; // is this from the request body?

    const { data, error } = await supabase.from("places").insert({
        name: idea, 
        location: '', 
        google_maps_link: ''
    })

    console.log(JSON.stringify(data));
    console.log(JSON.stringify(error));

    if (error) {
        return Response.json(error);
    }
    
    return Response.json(data);
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{slug: string}> }
) {
    // const { data, error } = await supabase.from("places").insert({name: 'test place', location: '', google_maps_link: ''})
    const { data, error } = await supabase.from("places").select()

    console.log(JSON.stringify(data));
    console.log(JSON.stringify(error));
    
    return Response.json(data)
}