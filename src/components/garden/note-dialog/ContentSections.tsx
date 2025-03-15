
import React from 'react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';
import {
  SummarySection,
  ContentSection,
  ApplicationsSection,
  ConsequencesSection,
  OriginMomentSection,
  SocraticSection,
  QuestionsSection,
  BookReferenceSection,
  TagsSection
} from './content';

interface ContentSectionsProps {
  note: MentalModel;
}

const ContentSections = ({ note }: ContentSectionsProps) => {
  return (
    <div className="mt-4 space-y-6">
      <SummarySection note={note} />
      <ContentSection note={note} />
      <ApplicationsSection note={note} />
      <ConsequencesSection note={note} />
      <OriginMomentSection note={note} />
      <SocraticSection note={note} />
      <QuestionsSection note={note} />
      <BookReferenceSection note={note} />
      <TagsSection note={note} />
    </div>
  );
};

export default ContentSections;
