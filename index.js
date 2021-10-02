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
  const couponID = url.substring(url.indexOf('=') + 1)
  // const data = await updateACoupon('BBBBB')
  const data = await useACounpon(couponID)
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'text/plain' },
  })
}
