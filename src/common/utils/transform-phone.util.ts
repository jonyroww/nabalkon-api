import _ from 'lodash';

export function TransformPhone(phone: String) {
  const regex = new RegExp(/\D/g);
  return phone.replace(regex, '');
}
