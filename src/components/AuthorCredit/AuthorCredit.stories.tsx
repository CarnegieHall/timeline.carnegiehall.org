import { AuthorCredit, AuthorCreditProps } from '.';

export default {
  title: 'Components/AuthorCredit',
  component: AuthorCredit
};

export const Default = ({
  author = {
    first_name: '`Dr. Portia K.',
    last_name: `Maultsby`,
    short_bio: `is a professor of ethnomusicology in the Department of Folklore and Ethnomusicology and Director of the Archives of African American Music and Culture at Indiana University.`,
    bio: ''
  }
}: AuthorCreditProps) => <AuthorCredit author={author} />;
