UPDATE public.work_equipment
SET image_url = 'https://static.bhphoto.com/images/images500x500/' || substring(image_url from '_(\d+_\d+\.jpg)$')
WHERE image_url LIKE 'https://www.bhphotovideo.com/cdn-cgi/%' AND image_url ~ '_\d+_\d+\.jpg$';