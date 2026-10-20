import {validateTitle, summarize, STATUSES} from '@hw/shared';
export {summarize, STATUSES};
export function taskPayload(title) {
 const error=validateTitle(title);
 if(error) throw new Error(error);
 return {title:title.trim()};
}
