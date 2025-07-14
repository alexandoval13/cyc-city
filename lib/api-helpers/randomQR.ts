import { v4 as uuidV4 } from 'uuid';

export const randomQR = () => `QR-${uuidV4()}`;
