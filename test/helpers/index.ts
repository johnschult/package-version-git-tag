import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const symlinkAsync = promisify(fs.symlink);

export const writeFile = promisify(fs.writeFile);

export async function createSymlink({
    symlinkPath,
    linkTarget,
}: {
    symlinkPath: string;
    linkTarget: string;
}): Promise<void> {
    const symlinkFullpath = path.resolve(symlinkPath);
    const symlinkTargetPath = path.isAbsolute(linkTarget)
        ? path.relative(path.dirname(symlinkFullpath), linkTarget)
        : linkTarget;
    await symlinkAsync(symlinkTargetPath, symlinkFullpath);
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
