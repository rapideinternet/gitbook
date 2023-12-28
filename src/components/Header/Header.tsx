import { Collection, CustomizationSettings, Space } from '@gitbook/api';
import { CustomizationHeaderPreset } from '@gitbook/api';
import { Suspense } from 'react';

import { CONTAINER_STYLE, HEADER_HEIGHT_DESKTOP } from '@/components/layout';
import { t, getSpaceLanguage } from '@/intl/server';
import { ContentRefContext } from '@/lib/references';
import { tcls } from '@/lib/tailwind';

import { CollectionSpacesDropdown } from './CollectionSpacesDropdown';
import { HeaderLink } from './HeaderLink';
import { HeaderLinks } from './HeaderLinks';
import { HeaderLogo } from './HeaderLogo';
import { SearchButton } from '../Search';
/**
 * Render the header for the space.
 */
export function Header(props: {
    space: Space;
    collection: Collection | null;
    collectionSpaces: Space[];
    context: ContentRefContext;
    customization: CustomizationSettings;
    withTopHeader?: boolean;
}) {
    const { context, space, collection, collectionSpaces, customization, withTopHeader } = props;

    const isCustomizationDefault =
        customization.header.preset === CustomizationHeaderPreset.Default;

    return (
        <header
            className={tcls(
                'flex',
                'flex-row',
                `h-[${HEADER_HEIGHT_DESKTOP}px]`,
                'sticky',
                'top-0',
                'z-10',
                'w-full',
                'flex-none',
                'shadow-thinbottom',
                withTopHeader ? null : 'lg:hidden',
                'lg:z-10',
                'dark:shadow-light/1',
                `${isCustomizationDefault || !withTopHeader ? 'bg-light' : 'bg-header-background'}`,
                `${
                    isCustomizationDefault || !withTopHeader
                        ? 'dark:bg-dark'
                        : 'bg-header-background'
                }`,
            )}
        >
            <div
                className={tcls(
                    'gap-4',
                    'grid',
                    'grid-flow-col',
                    'auto-cols-[auto_auto_1fr_auto]',
                    'h-16',
                    'items-center',
                    'align-center',
                    'justify-between',
                    'w-full',
                    CONTAINER_STYLE,
                )}
            >
                <HeaderLogo collection={collection} space={space} customization={customization} />
                <span>
                    {collection ? (
                        <CollectionSpacesDropdown
                            space={space}
                            collection={collection}
                            collectionSpaces={collectionSpaces}
                        />
                    ) : null}
                </span>
                <HeaderLinks>
                    {customization.header.links.map((link, index) => {
                        return (
                            <HeaderLink
                                key={index}
                                link={link}
                                context={context}
                                customization={customization}
                            />
                        );
                    })}
                </HeaderLinks>
                <div className={tcls('flex', 'md:w-56', 'grow-0', 'shrink-0', 'justify-self-end')}>
                    <Suspense fallback={null}>
                        <SearchButton
                            style={
                                !isCustomizationDefault && withTopHeader
                                    ? [
                                          'bg-header-background-400/6',
                                          'text-header-background-200',
                                          'ring-light/2',
                                          '[&>span]:text-header-background-200',
                                          '[&_svg]:stroke-header-background-200',
                                      ]
                                    : null
                            }
                        >
                            <span>{t(getSpaceLanguage(customization), 'search')}</span>
                        </SearchButton>
                    </Suspense>
                </div>
            </div>
        </header>
    );
}
