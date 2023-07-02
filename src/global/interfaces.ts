import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { ModalAction } from './constants';

export interface IIcon {
  title: string;
  img: string;
  style?: React.CSSProperties | undefined;
}

export interface ISidePanelItem {
  title: string;
  selected: boolean;
  onClick: any;
}

export interface ISongList {
  showModalHandler(id: string): void;
  setSnackBar(content: string): void;
}

export interface ISongItem {
  index: number;
  title: string;
  length: number;
  img: string;
  artist: string;
  id: string;
  liked: boolean;
  album: string;
  date: string;
  likeSongHandler(id: string): void;
  showModalHandler(id: string): void;
  setSnackBar(content: string): void;
  deleteSongHandler(id: string): void;
}

export interface ISongData {
  title: string;
  artist: string;
  length: number;
  img: string;
  release_date: string;
  popularity: number;
  id: string;
  preview_url: string;
  album: string;
  date: string;
  liked: boolean;
  bigImg: string;
  track_number: string;
}

export interface ISongModal extends ISongData {
  hideModalHandler(): void;
  handleAddToPlaylist(playlist: string, songID: string): void;
  setSnackBar(content: string): void;
  playlists: string[];
}

export interface ISongResults {
  showModalHandler(id: string): void;
  setSnackBar(content: string): void;
}

export interface ISongResultItem {
  title: string;
  img: string;
  artist: string;
  id: string;
  liked: boolean;
  likeSongHandler(id: string): void;
  showModalHandler(id: string): void;
  setSnackBar(content: string): void;
}

export interface IModalState {
  songData: ISongData | undefined;
}

export interface IModalAction {
  type: ModalAction;
  id?: string;
}

export interface IColumn {
  id: 'title' | 'album' | 'date' | 'length' | 'index' | 'like' | 'dots';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'center' | 'left' | 'right' | 'justify' | 'inherit' | undefined;
  svg?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
}

export const columns: readonly IColumn[] = [
  { id: 'index', label: '#' },
  { id: 'title', label: 'Title', minWidth: 170, maxWidth: 170 },
  { id: 'album', label: 'Album', minWidth: 170, maxWidth: 170 },
  {
    id: 'date',
    label: 'Date added',
  },
  { id: 'like', label: '' },
  {
    id: 'length',
    label: '',
    align: 'right',
    svg: AccessTimeIcon,
  },
  { id: 'dots', label: '' },
];

export interface IAddPlaylistModal {
  open: boolean;
  error: boolean;
  handleSave(name: string): void;
  onClose(): void;
}
