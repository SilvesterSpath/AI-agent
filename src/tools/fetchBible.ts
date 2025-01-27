import axios from 'axios'

export const fetchBibleCitation = async ({
  userMessage,
  toolArgs,
}: {
  userMessage: string
  toolArgs: { query: string; translation?: string }
}) => {
  const { query, translation = 'NIV' } = toolArgs

  try {
    const response = await axios.get(
      `https://api.bibleapi.co/v1/verses/search?q=${encodeURIComponent(
        query
      )}&translation=${translation}`
    )

    console.log('response.data', response.data)

    if (
      response.data &&
      response.data.verses &&
      response.data.verses.length > 0
    ) {
      return response.data.verses[0].text // Return the first result
    } else {
      return `No results found for "${query}".`
    }
  } catch (error) {
    console.error('Error fetching Bible citation:', error)
    return `An error occurred while fetching the Bible citation.`
  }
}
