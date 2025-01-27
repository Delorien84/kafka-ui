import React from 'react';
import { ClusterName, NewSchemaSubjectRaw } from 'redux/interfaces';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb';
import { clusterSchemaPath, clusterSchemasPath } from 'lib/paths';
import { NewSchemaSubject, SchemaType } from 'generated-sources';
import { SCHEMA_NAME_VALIDATION_PATTERN } from 'lib/constants';
import { useHistory, useParams } from 'react-router';

export interface NewProps {
  createSchema: (
    clusterName: ClusterName,
    newSchemaSubject: NewSchemaSubject
  ) => Promise<void>;
}

const New: React.FC<NewProps> = ({ createSchema }) => {
  const { clusterName } = useParams<{ clusterName: string }>();
  const history = useHistory();
  const {
    register,
    errors,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<NewSchemaSubjectRaw>();

  const onSubmit = React.useCallback(
    async ({ subject, schema, schemaType }: NewSchemaSubjectRaw) => {
      try {
        await createSchema(clusterName, {
          subject,
          schema,
          schemaType,
        });
        history.push(clusterSchemaPath(clusterName, subject));
      } catch (e) {
        // Show Error
      }
    },
    [clusterName]
  );

  return (
    <div className="section">
      <div className="level">
        <div className="level-item level-left">
          <Breadcrumb
            links={[
              {
                href: clusterSchemasPath(clusterName),
                label: 'Schema Registry',
              },
            ]}
          >
            New Schema
          </Breadcrumb>
        </div>
      </div>

      <div className="box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="field">
              <label className="label">Subject *</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Schema Name"
                  ref={register({
                    required: 'Schema Name is required.',
                    pattern: {
                      value: SCHEMA_NAME_VALIDATION_PATTERN,
                      message: 'Only alphanumeric, _, -, and . allowed',
                    },
                  })}
                  name="subject"
                  autoComplete="off"
                  disabled={isSubmitting}
                />
              </div>
              <p className="help is-danger">
                <ErrorMessage errors={errors} name="subject" />
              </p>
            </div>

            <div className="field">
              <label className="label">Schema *</label>
              <div className="control">
                <textarea
                  className="textarea"
                  ref={register({
                    required: 'Schema is required.',
                  })}
                  name="schema"
                  disabled={isSubmitting}
                />
              </div>
              <p className="help is-danger">
                <ErrorMessage errors={errors} name="schema" />
              </p>
            </div>

            <div className="field">
              <label className="label">Schema Type *</label>
              <div className="control select">
                <select
                  ref={register({
                    required: 'Schema Type is required.',
                  })}
                  name="schemaType"
                  disabled={isSubmitting}
                >
                  <option value={SchemaType.AVRO}>AVRO</option>
                  <option value={SchemaType.JSON}>JSON</option>
                  <option value={SchemaType.PROTOBUF}>PROTOBUF</option>
                </select>
              </div>
              <p className="help is-danger">
                <ErrorMessage errors={errors} name="schemaType" />
              </p>
            </div>
          </div>
          <br />
          <div className="field">
            <div className="control">
              <input
                type="submit"
                className="button is-primary"
                disabled={isSubmitting || !isDirty}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New;
