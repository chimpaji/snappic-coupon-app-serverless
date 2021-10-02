//prettier-ignore


export const getACoupon = async couponID => {
  if (!couponID) throw new Error('couponID is required')
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Table%201?filterByFormula=Coupon="${couponID}"`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_APIKEY}`,
          'Content-type': 'application/json',
        },
      },
    )
    const data = await response.json()
    return { status: 200, data: data }
  } catch (error) {
    console.error(error)
    return []
  }
}

export const useACounpon = async couponID => {
  if (!couponID) throw new Error('couponID is required')
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Table%201?filterByFormula=Coupon="${couponID}"`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_APIKEY}`,
          'Content-type': 'application/json',
        },
      },
    )
    const data = await response.json()
    //if the record is not exist
    if (!data.records[0].id)
      return { status: 200, data: { message: 'Invalid coupon' } }

    const recordID = await data.records[0].id
    //if found record use Patch request to update the field
  
    const updateResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Table%201/${recordID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_APIKEY}`,
          'Content-type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ "fields": {
            "Status": "USED"
          }}),
        redirect: 'follow'
      },
    )
    const updateData = await updateResponse
    if(updateData.statusText === 'OK') return { status: 'success', data:{message:'Updated coupon'} }

  } catch (error) {
    console.error(error)
    return []
  }
}
