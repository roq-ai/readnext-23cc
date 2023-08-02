const mapping: Record<string, string> = {
  books: 'book',
  contents: 'content',
  'content-engagements': 'content_engagement',
  publishers: 'publisher',
  'reading-histories': 'reading_history',
  'spaced-repetition-schedules': 'spaced_repetition_schedule',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
