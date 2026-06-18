'use client';

import { memo } from 'react';
import Linkify from './Linkify';

const MemoizedLinkify = memo(Linkify);
MemoizedLinkify.displayName = 'MemoizedLinkify';

export default MemoizedLinkify;
