import { getACoupon, useACounpon } from './utils/airtable'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = request.url
  const method = request.method
  //xxxxxx/?couponID=cccc
  const couponID = url.substring(url.indexOf('=') + 1)
  // const data = await updateACoupon('BBBBB')
  let data
  if (method === 'GET') {
    data = await getACoupon(couponID)
  }
  if (method === 'PATCH') {
    data = await useACounpon(couponID)
  }
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'text/plain' },
  })
}
