const SERVER_ERR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
const NOT_FOUND_ERR = 'Ничего не найдено';
const INVALID_DATA_ERR = 'Неверно заполнено одно из полей';
const UNAUTHORIZED_ERR = 'Неправильный логин или пароль';
const CONFLICT_ERR = 'Пользователь с таким email уже существует';
const UPDATE_ERR = 'Ошибка при обновлении данных';
const UPDATE_SUCCESS = 'Данные успешно обновлены';
const UPDATE_UNSUCCESS = 'При обновлении профиля произошла ошибка';

export {
  SERVER_ERR,
  NOT_FOUND_ERR,
  INVALID_DATA_ERR,
  UNAUTHORIZED_ERR,
  CONFLICT_ERR,
  UPDATE_ERR,
  UPDATE_SUCCESS,
  UPDATE_UNSUCCESS 
};